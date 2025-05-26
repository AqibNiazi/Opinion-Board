import { createContext, useEffect, useState } from 'react';

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch('http://localhost:3000/opinions');
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch('http://localhost:3000/opinions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id) {
    // Optimistically update the opinion votes
    // This is a simple optimistic update; in a real application, you might want to handle errors more gracefully.
    // For example, you could revert the vote if the server request fails.
    // Note: This does not send the upvote to the server; you would need to implement that separately.
    try {
      const response = await fetch(
        `http://localhost:3000/opinions/${id}/upvote`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        return;
      }
    } catch (error) {
      console.error("Error upvoting opinion:", error);
    }

    // Update the local state to reflect the upvote
    // This is an optimistic update, assuming the server will process the upvote correctly.
    // If the server request fails, you might want to handle that case.
    // For now, we just update the local state.

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/opinions/${id}/downvote`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        return;
      }
    } catch (error) {
      console.error("Error downvoting opinion:", error);
    }
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
