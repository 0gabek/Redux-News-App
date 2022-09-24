import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "./../hooks/useHttp";
import { v4 } from "uuid";
import { newsCreated } from "./NewsList/news_slice";

export default function NewsAddForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { filters, filterLoadingStatus } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newNews = { id: v4(), name, description, category };
    request("http://localhost:3001/news", "POST", JSON.stringify(newNews))
      .then(dispatch(newsCreated(newNews)))
      .catch((err) => console.log(err));

    setName("");
    setCategory("");
    setDescription("");
  };

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Loading options</option>;
    } else if (status === "error") {
      return <option>Error options</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === "all") return;
        return (
          <option className="text-dark" value={name} key={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          News heading
        </label>
        <input
          type="text"
          required
          name="name"
          id="name"
          placeholder="Title..."
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          News details
        </label>
        <textarea
          type="text"
          required
          name="text"
          id="text"
          placeholder="News about..."
          className="form-control"
          style={{ height: "120px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Choose Category
        </label>
        <select
          className="form-select"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" className="text-dark" disabled>
            News category
          </option>
          {renderFilters(filters, filterLoadingStatus)}
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-secondary border w-100 text-white"
      >
        Create News
      </button>
    </form>
  );
}
