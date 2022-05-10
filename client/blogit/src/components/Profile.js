import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Button } from 'react-bootstrap'
import FormHandler from "./FormHandler";
import Update from "./Update";
import Delete from "./Delete";
import Logout from "./Logout";
import {
  Link
} from "react-router-dom";

// NEXT => Read up on scopes, but for now, add a all POSTS page for when the user logs in!
const Profile = ({ handlePost, posts }) => {
  const { isAuthenticated, user } = useAuth0();
  const [userposts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const author = await user.name;
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/all-posts?author=${author}`
        );

        setUserPosts(response.data);
      } catch (e) {
        console.log(e.response);
      }
    };

    fetchData();
  }, [user.name]);

  console.log(userposts);

  return (
    isAuthenticated && (
      <div>
        <header>
      <Link to="/">Home</Link>
          <Logout />
        </header>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <section className="my-posts">
          {userposts.length === 0 ? (
            <div>
              <h1>No posts found</h1>
              <FormHandler user={user} />
            </div>
          ) : (
            userposts.map((el) => {
              return (
                <>
                  <ul>
                    <li>
                      <h1>{el.title}</h1>
                      <button>Read More</button>
                    </li>
                  </ul>
                  <Update id={el._id} />

                  <Delete id={el._id} />
                </>
              );
            })
          )}
          <FormHandler user={user} />
        </section>
      </div>
    )
  );
};

export default Profile;
