import { useState } from "react";
import Flashcard from "./Flashcard.jsx";

export default function FlascardList({flashcards}) { 
    return (
        <div className="card-grid">
            {flashcards.map(flashcard => {
                return <Flashcard flashcard={flashcard} key={ flashcard.id} />
            })}
        </div>
    )
}