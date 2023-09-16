import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
    type,
    selectedGenres,
    genres,
    setGenres,
    setSelectedGenres,
    setPage,
}) => {
    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setGenres(data.genres);
    };

    useEffect(() => {
        fetchGenres();
        // eslint-disable-next-line
    }, []);

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        )
        setGenres([...genres, genre]);
        setPage(1);
    }

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres && selectedGenres.map((genre) => {
                return <Chip
                    label={genre.name}
                    style={{ margin: 2 }}
                    clickable
                    size="small"
                    key={genre.id}
                    color="primary"
                    onDelete={() => handleRemove(genre)}
                />;
            })}
            {genres && genres.map((genre) => {
                return <Chip
                    label={genre.name}
                    style={{ margin: 2 }}
                    clickable
                    onClick={() => handleAdd(genre)}
                    size="small"
                    key={genre.id}
                />;
            })}
        </div>
    );
};

export default Genres;
