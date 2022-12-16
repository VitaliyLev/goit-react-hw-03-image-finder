import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { Box } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    articles: [],
    query: '',
    status: 'idle',
    page: 1,
    totalPageApiRequest: null,

    showModal: false,
    imageModal: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;

    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.setState({ status: 'pending' });

      if (prevQuery !== newQuery) {
        this.setState({ page: 1 });
        this.setState({ articles: [] });
      }

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${newQuery}&page=${newPage}&key=31278796-a3a5484ed91accb8b7bce1cf7&image_type=photo&orientation=horizontal&per_page=12`
        );

        const currentSearchImage = response.data.hits;
        const totalpageApi = Math.ceil(response.data.totalHits / 12);

        this.setState(prevState => ({
          articles: [...prevState.articles, ...currentSearchImage],
          status: 'resolved',
          totalPageApiRequest: totalpageApi,
        }));

        if (prevPage === newPage && currentSearchImage.length !== 0) {
          toast.success(`Found ${response.data.totalHits} pictures!  `);
        }

        if (currentSearchImage.length === 0) {
          toast.error('Invalid query, please try again!');
        }

        if (this.state.page > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight * 10,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        toast.error('Something went wrong, please try again!');
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ imageModal: largeImageURL });
  };

  render() {
    const {
      articles,
      status,
      showModal,
      imageModal,
      page,
      totalPageApiRequest,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Box>
          {articles.length > 0 && (
            <ImageGallery>
              <ImageGalleryItem
                articles={articles}
                onClick={this.toggleModal}
              />
            </ImageGallery>
          )}

          {status === 'pending' && <Loader />}

          {articles.length >= 12 && totalPageApiRequest !== page && (
            <LoadMoreBtn onClick={this.handleBtnClick} />
          )}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={imageModal} alt="" />
            </Modal>
          )}

          <Toaster position="top-right" reverseOrder={true} />
        </Box>
      </>
    );
  }
}
