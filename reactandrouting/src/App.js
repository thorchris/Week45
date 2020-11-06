import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useLocation,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { useState, React } from 'react';

function App({bookFacade}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status =>{
    setIsLoggedIn(status)
    history.push("/")
  }

  return (
<div>
  <Header
  loginMsg={isLoggedIn ? "Logout" : "Login"}
  isLoggedIn={isLoggedIn} 
  />
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/products">
      <Products bookFacade={bookFacade}/>
    </Route>
    <Route path="/company">
      <Company />
    </Route>
    <Route path="/add-book">
      <AddBook bookFacade={bookFacade} />
    </Route>
    <Route path="/find-book">
      <FindBook bookFacade={bookFacade} />
    </Route>
    <Route path="/login-out">
      <Login 
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        setLoginStatus={setLoginStatus}
      />
    </Route>
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
</div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Header({isLoggedIn, loginMsg}) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </li>
      {isLoggedIn && (
      <>
      <li> 
        <NavLink activeClassName="active" to="/add-book">
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/find-book">
          Find Book
        </NavLink>
      </li>
      </>
      )}
      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/login-out">
          {loginMsg}
        </NavLink>
      </li>
    </ul>
  );
}

function FindBook({ bookFacade }) {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);

  const findBook = () => {
    const foundBook = bookFacade.findBook(bookId);
    setBook(foundBook);
  };

  const deleteBook = (id) => {
    bookFacade.deleteBook(id);
    setBook(null);
  };
  return (
    <div>
      <h2>Find a book</h2>

      <input
        id="book-id"
        placeholder="Enter book ID"
        onChange={(e) => {
          setBookId(e.target.value);
        }}
      />
      <button onClick={findBook}>Find book</button>

      {book && (
        <div>
          <p>Title: {book.title}</p>
          <p>Info: {book.info}</p>
          <p>ID: {book.id}</p>
          <div>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Details({ bookFacade }){
  const {bookId} = useParams();
  const book = bookFacade.findBook(bookId);

  const showBook = book ? (
    <div>
      <h3>Book information:</h3>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <p>Info: {book.info}</p>
    </div>
  ) : (
    <p>Book not found</p>
  )
  return <div>{showBook}</div>
}

function Products({bookFacade}) {
  const books = bookFacade.getBooks();
  let {path, url} =  useRouteMatch();

  const list = books.map(book => {
    return (
      <li key={book.id}>
        {book.title}
        &nbsp;
        <Link to={`${url}/${book.id}`}>details</Link>
      </li>
    )
  })
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {list}
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Select a book to get details</h3>
        </Route>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function Login({isLoggedIn, loginMsg, setLoginStatus}){
  const handleBtnClick = () => {
    setLoginStatus(!isLoggedIn);
  };
  return (
    <div>
      <h2>{loginMsg}</h2>
      <em>Login simulation</em>
      <br />
      <button onClick={handleBtnClick}>{loginMsg}</button>
    </div>
  )
}

function AddBook({bookFacade}) {
  const emptyBook = {id: "", title: ""};
  const [book, setBook] = useState({...emptyBook})

  const handleChange = e => {
    const {id, value} = e.target;
    setBook({ ...book, [id]: value})
  };

  const handleSubmit = e => {
    e.preventDefault()
    bookFacade.addBook(book);
    setBook({...emptyBook});
  }

  return (
    <div>
      <h2>AddBook</h2>
      <form>
        <input type="text" id="title" placeholder="Add Title" onChange={handleChange} value={book.title}></input>
        <br />
        <input type="text" id="info" placeholder="Add Info" onChange={handleChange} value={book.info}></input>
        <br />
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
  }

export default App;
