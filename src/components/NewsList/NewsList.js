import React, { useCallback, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import Error from "../Error";
import NewsListItem from "../NewsListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../style/news_list.css";
import { newsDeleted, fetchNews, filteredNewsSelected } from "./news_slice";

export default function NewsList() {
  const filteredNews = useSelector(filteredNewsSelected);

  const filterLoadingStatus = useSelector((state) => state.filterLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchNews());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/news/${id}`, "DELETE")
      .then(dispatch(newsDeleted(id)))
      .catch(() => dispatch("NEWS_FETCHING_ERROR"));
    // eslint-disable-next-line
  }, []);

  if (filterLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filterLoadingStatus === "error") {
    return <Error />;
  }

  const renderNewsList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={500} classNames="item">
          <h4 className="text-center mt-5">News doesn't exist</h4>
        </CSSTransition>
      );
    }
    return arr
      .map(({ id, ...props }) => {
        return (
          <CSSTransition key={id} timeout={500} classNames="item">
            <NewsListItem key={id} onDelete={() => onDelete(id)} {...props} />
          </CSSTransition>
        );
      })
      .reverse();
  };
  const element = renderNewsList(filteredNews);

  return <TransitionGroup component="ul">{element}</TransitionGroup>;
}
