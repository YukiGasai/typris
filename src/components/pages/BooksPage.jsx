import React, { useEffect, useRef, useState } from "react";
import syled, { useTheme } from "styled-components";
import { bookId, bookPosition, pagePosition, user } from "../../helper/gameSignals";
import { backendUrl } from "../../helper/backendUrl";
import LoadingContainer from "../LoadingContainer";
import { toast } from "react-toastify";
import { StyledSettingsItem, getAlignment } from "./SettingsPage";
import { useTranslation } from "react-i18next";
import InputSlider from "../InputSlider";
import InputText from "../InputText";
import WarningButton from "../WarningButton";
import { useDebounce } from "use-debounce";

const BooksPage = () => {

    const { t } = useTranslation();
    const {colors} = useTheme();
    const [books, setBooks] = useState([]);
    const [booksLoading, setBooksLoading] = useState(false);
    const [addBookLoading, setAddBookLoading] = useState(false);
    const [bookSearch, setBookSearch] = useState("");
    const bookUrl = useRef(null);
    const [loadPage, setLoadPage] = useState(false);
    const [pagePreview, setPagePreview] = useState([]);

    const [bookNumber, setBookNumber] = useState(bookPosition.peek());
    const [pageNumber, setPageNumber] = useState(pagePosition.peek());

    const [bufferedBookNumber] = useDebounce(bookNumber, 750);


    useEffect(() => {
        if(!user.value) {
            window.location.hash = "#/intro";
        }
 
        const fetchBooks = async () => {
            setBooksLoading(true);
            try {
                const response = await fetch(`${backendUrl()}/api/book/list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                
                setBooks(data);
            } catch (error) {
                toast.error(t("Error fetching books"));
                console.log(error);
            }
            setBooksLoading(false);
        }
    
        fetchBooks();
    }, []);
    

    const getCurrentBook = () => {
        if(!bookId.value) return null;
        return books.find(book => book._id === bookId.value);
    }

    useEffect(() => {
        if(!bookId.value || !user.value) {
            bookPosition.value = bufferedBookNumber;
            return;
        }

        const fetchPage = async () => {
            setLoadPage(true);
            try {
                const response = await fetch(`${backendUrl()}/api/book?id=${bookId.value}&page=${bufferedBookNumber}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if(response.status !== 200) {
                    new Error("Error fetching page");
                }
                const data = await response.text();
                if(data) {
                    bookPosition.value = bufferedBookNumber;                
                    const words = data.split(' ');
                    const chunks = [];
                    
                    for (let i = 0; i < words.length; i += 10) {
                        chunks.push(words.slice(i, i + 10).join(' '));
                    }
                    setPagePreview(chunks);
                }
            } catch (error) {
                toast.error(t("Error fetching page"));
                console.log(error);
            }
            setLoadPage(false);
        }
        fetchPage();

    }, [bufferedBookNumber, bookId.value]);

    const addBook = async () => {
        if(addBookLoading || booksLoading) {
            toast.error("Please wait for the current request to finish");
            return;
        };
        const url = bookUrl.current.value;

        if(!url || !url.startsWith("https://www.gutenberg.org/")) {
            toast.error("Please enter a valid Gutenberg url")
            return;
        }
        setAddBookLoading(true);
        const response = await fetch(`${backendUrl()}/api/book?url=${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({url}),
        });
        if(response.status === 200) {

            const newBook = await response.json();
            toast.success("Book added");
            setBooks(books => [...books, newBook])
            bookUrl.current.value = "";
        } else {
            toast.error("Error adding book");
        }
        setAddBookLoading(false);
    }

    return (
        <StyledBooksPage>
            <div className="header">
                <h1>{t('Books')}</h1>
                <InputText type="text" placeholder={t('Search') + "..."}value={bookSearch} onChange={(e)=>setBookSearch(e.target.value)}/>
            </div>
            <p>{t('bookIntro')}</p>


            <h2>{t('Select a book')}</h2>
            <div className="bookList">
            {booksLoading ? <LoadingContainer />:
                books
                .filter(book => book.title.toLowerCase().includes(bookSearch.toLowerCase()))
                .map((book,index) => (
                    <div
                        key={index}
                        onClick={() => bookId.value = book._id}
                        className={bookId.value === book._id ? "bookItem selected" : "bookItem"}>
                        <h3>{book.title}</h3>
                        <p>{book.url}</p>
                    </div>
                ))}
            </div>

            <StyledSettingsItem>
                <div className="wide">
                    <h2>{t('Select Position in book')}</h2>
                </div>
                <p>{t('bookPositionIntro')}</p>
                <div className='sliderContainer'>
                    <span>{t('Book Position')}<span>{bookNumber}</span></span>
                    <InputSlider type='range' min='0' max={getCurrentBook()?.lastPage || 0} value={bookNumber} onChange={(e) =>setBookNumber(e.target.value)} />
                 
                    <span>{t('Page Offset')}<span>{pageNumber}</span></span>
                    <InputSlider type='range' min='0' max='9' value={pageNumber % 10} onChange={(e) => setPageNumber(e.target.value)} />
                </div>
               
               <div className="pagePreview">
                    <h3>Position: {bookNumber}</h3>
                    <div>
                        {loadPage ? <LoadingContainer /> : <p>
                            {pagePreview.map((content,index) =>
                                <span key={index} className={pageNumber % 10 === index ? "selected" : ""}>
                                    {content}
                                </span>
                            )}
                        </p>}
                    </div>
                </div>

            </StyledSettingsItem>

            <StyledSettingsItem>
                <div className="wide">
                    <h2>{t('Request a new book')}</h2>
                </div>
                <p>{t('guttenBergIntro')}</p>
                <InputText ref={bookUrl} type="text" placeholder="Gutenberg Url"/>
           
            </StyledSettingsItem>
            <WarningButton className="submitButton" callback={addBook} text={t('Submit')} color={colors.primary}/>

            {addBookLoading && <LoadingContainer />}
        </StyledBooksPage>
    );
}

const StyledBooksPage = syled.div`
    max-width: 700px;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 10%;

    ${getAlignment}

    @media (max-width: ${props => props.theme.screens.mobile}) {
        width: 90%;
        margin: 0 5%;
        p {
            grid-column: 1 / span 2;
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    p {
        width: 80%;
    }

    .submitButton {
        margin: 10px auto;
        width: 400px;
    }

    .rangeSlider {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        p {
            text-align: center;
        }
    }

    .pagePreview {
        grid-column: 1 / span 2;
        width: 100%;
        p {
            width: 100%;
        }
        margin: 10px 0;

        .selected {
            background-color: ${props => props.theme.colors.primary};
        }
    }

    .bookList {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(100% - 20px);
        max-height: 800px;
        gap: 10px;
    }

    .bookItem {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid ${props => props.theme.colors.primary};
        cursor: pointer;
        transition: transform 0.2s ease-in-out;

        &:hover, &:focus{
            transform: scaleX(0.98);
        }

        & > * {
            @media (max-width: ${props => props.theme.screens.mobile}) {
                grid-column: 1 / span 2;
            }
        }
    }

    .selected {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.background};
    }

    h2 {
        padding: 10px 0;
    }

    .sliderContainer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: max-content;
        span {
            display: flex;
            flex-direction: row;
            gap: 5px;
            width: 100%;
            text-align: center;
            justify-content: space-between;
            span {
                width: fit-content;
            }
        }
    }

`

export default BooksPage;
