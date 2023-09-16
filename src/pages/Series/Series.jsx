import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import useGenre from "../../hooks/useGenre";
import axios from "axios";

const Series = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforUrl = useGenre(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&with_genres=${genreforUrl}&sort_by=popularity.desc`
        );

        setContent(data.results);
        setNumOfPages(Math.min(data.total_pages, 500));
    };

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreforUrl]);

    return (
        <div>
            <span className="pageTitle">TV Series</span>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                genres={genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />
            <div className="trending">
                {content &&
                    content.map((c) => {
                        return (
                            <SingleContent
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type="tv"
                                vote_average={c.vote_average}
                            />
                        );
                    })}
            </div>
            {numOfPages > 1 && (
                <CustomPagination
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
            )}
        </div>
    );
};

export default Series;
