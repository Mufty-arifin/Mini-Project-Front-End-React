import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";
import Sidebar from "../../components/Sidebar";
import img1 from "../../assets/img/user.png";
import img2 from "../../assets/img/search.png";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const Home = () => {
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [page, setPage] = useState({
    total_pages: 0,
    current_page: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    setPage({
      ...page,
      current_page: page.current_page - 1,
    });
  };
  const handleNext = () => {
    setPage({
      ...page,
      current_page: page.current_page + 1,
    });
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = () => {
    // You can add additional logic here if needed
    getData(); // Refresh the data based on the current page when submitting the search
  };
  const getData = () => {
    axios
      .get(`https://reqres.in/api/users?per_page=5&page=${page.current_page}`)
      .then((res) => {
        setData(res.data.data);
        setPage({
          total_pages: res.data.total_pages,
          current_page: res.data.page,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Count Users
  const fetchData = async () => {
    try {
      const responsePage1 = await axios.get(
        "https://reqres.in/api/users?page=1"
      );
      const usersPage1 = responsePage1.data.data;

      const responsePage2 = await axios.get(
        "https://reqres.in/api/users?page=2"
      );
      const usersPage2 = responsePage2.data.data;

      const totalUsers = usersPage1.length + usersPage2.length;
      setUserCount(totalUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();

    fetchData();
  }, [page.current_page]);

  const filteredUsers = data.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Sidebar />
      <Container>
        <div className="container-home">
          <div className="header-custom">
            <div className="nav-custom">
              <div className="search">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search.."
                />
                <button
                  type="submit"
                  onClick={handleSearchSubmit}
                  style={{ cursor: "pointer" }}
                >
                  <img src={img2} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="content-custom">
            <div className="content-1">
              <Row>
                <Col md={4} className="mb-2 mt-3">
                  <div className="cards-custom">
                    <div className="box">
                      <h1>{userCount}</h1>
                      <h3>Users</h3>
                    </div>
                    <div className="icon-case">
                      <img src={img1} alt="" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="content-2">
              <div className="list-users">
                <div className="title">
                  <h2 >
                    List Users
                  </h2>
                  <div className="pagination">
                    <button
                      className="btn-pagination"
                      onClick={handleBack}
                      disabled={page.current_page === 1}
                    >
                      <i className="bx bxs-chevron-left"></i> Back
                    </button>
                    <button
                      className="btn-pagination"
                      onClick={handleNext}
                      disabled={page.current_page === page.total_pages}
                    >
                      Next <i className="bx bxs-chevron-right"></i>
                    </button>
                  </div>
                </div>
                <table className="responsive-table">
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Option</th>
                  </tr>

                  {filteredUsers.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.avatar} alt="" />
                      </td>
                      <td>
                        {item.first_name} {item.last_name}
                      </td>
                      <td>{item.email}</td>
                      <td>
                        <Link to={`/user/${item.id}`}>
                          <button
                            className="btn btn-info"
                            style={{ margin: "5px" }}
                          >
                            <i className="bx bx-search-alt-2"></i>
                          </button>
                        </Link>
                        <button
                          className="btn btn-warning"
                          style={{ margin: "5px" }}
                        >
                          <i className="bx bxs-edit"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ margin: "5px" }}
                        >
                          <i className="bx bx-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <td></td>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
