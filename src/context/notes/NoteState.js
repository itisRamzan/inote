import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState([]);
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const getNotes = async () => {
        if (isAuthenticated === "true") {
            const response = await fetch(backendURL + "/api/notes/fetchallnotes", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonData = await response.json();
            if (response.status === 200) {
                setNotes(jsonData.notes);
            }
            else {
                console.log(jsonData.message);
            }
        }
    }
    const addNote = async (title, description, tag) => {
        const response = await fetch(backendURL + "/api/notes/addnote", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            setNotes(jsonData.notes);
        }
        else if (jsonData.errors) {
            jsonData.errors.forEach(error => {
                console.log(error.msg);
            });
        }
        else {
            console.log(jsonData.message);
        }
    }
    const deleteNote = async (id) => {
        const response = await fetch(`${backendURL}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            setNotes(jsonData.notes);
        }
        else {
            console.log(jsonData.message);
        }
    }
    const editNote = async (id, title, description, tag) => {
        // const response = await fetch(`http://127.0.0.1:5000/api/notes/updatenote/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "token": token
        //     },
        //     body: JSON.stringify({ title, description, tag })
        // });
        // for (let index = 0; index < notes.length; index++) {
        //     const element = notes[index];
        //     if (element._id === id) {
        //         element.title = title;
        //         element.description = description;
        //         element.tag = tag;
        //     }
        // }
        console.log("Edited a note, with id = " + id);
    }
    const getUser = async () => {
        if (isAuthenticated === "true") {
            const response = await fetch(backendURL + "/api/auth/user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonData = await response.json();
            return jsonData.user;
        }
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, getUser, user }}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;