import Head from "next/head";
import CSVReader from "react-csv-reader";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

export default function Home() {
  const { handleSubmit, register } = useForm();
  const [list, set] = useState([]);
  const [done, setDone] = useState([]);
  const [auth, setAuth] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [siteurl, setSiteurl] = useState();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [done]);

  async function upload(list) {
    setUploading(true);
    for (const item of list) {
      const date = moment(item.date).isValid() ? moment(item.date).format() : null;
      const res = await fetch(siteurl + "/wp-json/wp/v2/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          ...item,
          date,
          status: "publish",
        }),
      }).then((res) => res.json());
      setDone((v) => v.concat(res));
    }
    setUploading(false);
    alert('all uploads complete!');
  }

  const setCredentials = async (values) => {
    setAuthenticating(true);
    const { username, password } = values;
    const response = await fetch(siteurl + "/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const { token, user_nicename } = await response.json();
    if (token) {
      setAuth({
        token,
        user_nicename,
      });
    } else {
      alert("Failed to authenticate. Please check your credentials");
    }
    setAuthenticating(false);
  };

  const handleSiteUrl = (values) => {
    setSiteurl(values.siteurl);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header>
          {!siteurl && (
            <section>
              <h1>Please Enter Site URL</h1>
              <form onSubmit={handleSubmit(handleSiteUrl)}>
                <label>
                  Site URL (i.e. https://multisite.com/site)
                  <br />
                  <small>No Trailing Slash</small>
                </label>
                <input type="text" name="siteurl" ref={register} />
                <input type="submit" value="Save" />
              </form>
            </section>
          )}
          {siteurl && <h1>{siteurl}</h1>}
          {siteurl && (
            <section>
              <h2>Select CSV File</h2>
              <small className="link" onClick={() => alert('Must contain `slug`, `title,` `date`, and `content`. All other fields will be ignored.')}>
                View Requirements
                </small>
              <CSVReader
                parserOptions={{ header: true }}
                onFileLoaded={(data, fileInfo) => set(data)}
              />
              {list.length > 0 && (
                <section>
                  <div style={{ textAlign: 'left' }}>
                    <small>
                      {list.length} items loaded
                    </small>
                  </div>
                  <ul>
                    {list?.map((item) => {
                      return <li key={item.slug}>{item.title}</li>;
                    })}
                  </ul>
                </section>
              )}
            </section>
          )}
          {list.length > 0 && !auth && (
            <section>
              <h2>Enter your WP Credentials</h2>
              <form onSubmit={handleSubmit(setCredentials)}>
                <label>
                  Username
                  <input type="text" name="username" ref={register}></input>
                </label>
                <label>
                  Password
                  <input type="password" name="password" ref={register}></input>
                </label>
                <input
                  disabled={authenticating}
                  type="submit"
                  value={authenticating ? "Authenticating..." : "Authenticate"}
                />
              </form>
            </section>
          )}
          {auth && (
            <h3>Welcome{auth.user_nicename && `, ${auth.user_nicename}`}</h3>
          )}
          {auth && siteurl && (
            <section>
              <button disabled={uploading} onClick={() => upload(list)}>
                {uploading ? "Uploading..." : "Start Upload"}
              </button>
              <br />
              <br />
              {uploading && <em>Do not close this window until it is finished or you will have to start over.</em>}
            </section>
          )}
          {done.length > 0 &&
            <section>
              <h2>Completed Uploads: {done.length}</h2>
              <ul className="small">
                {done.map(item => <li key={item.id}>{item.id} - {item.slug}</li>)}
              </ul>
            </section>
          }
        </header>
      </main>
      <style jsx>{`
        main {
          text-align: center;
          padding: 8px;
          max-width: 100ch;
          margin: 0 auto;
        }

        ul:not(.small) {
          height: 250px;
          overflow-y: auto;
          box-shadow: inset 0px 0px 6px black;
        }

        ul {
          text-align: left;
          list-style: none;
          padding: 10px;
          margin: 5px 0;
        }

        ul.small {
          font-size: 0.75em;
        }

        label {
          display: block;
        }

        small.link {
          cursor: pointer;
        }

        small.link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
