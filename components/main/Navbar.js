import React from "react";
// import "extra-method";

const Navbar = ({posts, logo}) => {
  var veri = posts.map((post) => post.properties.Status.select.name);

  let uniqueChars = veri.filter((c, index) => {
    return veri.indexOf(c) === index;
  });

  //////

  const result = uniqueChars.reduce((acc, val) => {
    const [key, value] = val.split("/");

    if (!acc[key]) {
      acc[key] = [value];
    } else if (!acc[key].includes(value)) {
      acc[key].push(value);
    }

    return acc;
  }, {});

  const finalResult = [];

  Object.entries(result).forEach(([key, value]) => {
    if (value.length === 1) {
      finalResult.push(key);
    } else {
      finalResult.push({ [key]: value });
    }
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            {logo}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {finalResult.map((item, index) => {
                const key = Object.keys(item)[0];
                const values = item[key];
                if (item !== "KAPALI") {
                  if (typeof values === "string") {
                    return (
                      <li className="nav-item" key={index}>
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href={`/category/${item}`}
                        >
                          {item}
                        </a>
                      </li>
                    );
                  } else {
                    return (
                      <li className="nav-item dropdown" key={index}>
                        <a
                          className="nav-link dropdown-toggle"
                          href={`/category/${key}`}
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {key}
                        </a>
                        <ul className="dropdown-menu">
                          {values.map((value, i) => {
                            return (
                              <li key={i}>
                                <a
                                  className="dropdown-item"
                                  href={`/category/${key}-${value}`}
                                >
                                  {value}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  }
                }
              })}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
