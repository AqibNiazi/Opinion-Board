import { use, useActionState, useOptimistic } from "react";
import { OpinionsContext } from "../store/opinions-context";
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );

  const upvoteAction = async () => {
    // This function will be called when the upvote button is clicked.
    setVotesOptimistically("up");
    // Optimistically update the votes count.
    // This is where you would typically call an API to update the opinion's votes.
    await upvoteOpinion(id);
  };
  const downvoteAction = async () => {
    // This function will be called when the downvote button is clicked.
    setVotesOptimistically("down");
    // Optimistically update the votes count.
    // This is where you would typically call an API to update the opinion's votes.
    await downvoteOpinion(id);
  };

  const { upvoteFormState, upvoteFormAction, upvotePending } =
    useActionState(upvoteAction);
  const { downvoteFormState, downvoteFormAction, downvotePending } =
    useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downvoteAction}
          disabled={downvotePending || upvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
