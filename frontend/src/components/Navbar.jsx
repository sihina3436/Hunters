import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../pages/shop/Cart";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import userImg from "../assets/userImg.jpg";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  // Redux state for cart products
  const products = useSelector((state) => state.cart.products);
  console.log(products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Show user if Logged in
  const dispathch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // user dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const adminDropdownMenus = [
    { lableL: "Dashboard", path: "/dashboard/admin" },
    { lableL: "Manage Items", path: "/dashboard/manage-products" },
    { lableL: "All orders", path: "/dashboard/manage-all-orders" },
    { lableL: "Add Product", path: "/dashboard/add-product" },
  ];

  // user dropdown menu
  const userDropdownMenus = [
    { lableL: "Dashboard", path: "/dashboard" },
    { lableL: "profile", path: "/dashboard/profile" },
    { lableL: "payment", path: "/dashboard/payments" },
    { lableL: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  // handle logout
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispathch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="  top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Left: Navigation Links - Large Screens */}
        <div className="hidden md:flex flex-1">
          <ul className="flex list-none items-center gap-8">
            <li className="font-medium text-text-dark hover:text-primary">
              <Link to="/">Home</Link>
            </li>
            <li className="font-medium text-text-dark hover:text-primary">
              <Link to="/shop">Shop</Link>
            </li>
            <li
              className="relative font-medium text-text-dark hover:text-primary cursor-pointer"
              // onMouseEnter={() => setDropdownOpen(true)} guys i decided to remove this line of code because it give me an error. i think onclick is better
              // onMouseLeave={() => setDropdownOpen(false)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>categories</span>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/gift">Gift Collection</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/bags">Bags Collection</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/dress">Dress Collection</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/shoose">Shoose Collection</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="font-medium text-text-dark hover:text-primary">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Link
            to="/"
            className="text-2xl font-custom font-extrabold text-text-dark"
          >
            ZeroZcloths<span className="text-primary">.</span>
          </Link>
        </div>

        {/* Right: Nav Icons & Hamburger Menu */}
        <div className="flex items-center flex-1 justify-end gap-6">
          <Link
            to="/search"
            className="text-[20px] text-text-dark hover:text-primary"
          >
            <i className="ri-search-line"></i>
          </Link>
          <button
            className="hover:text-primary relative"
            onClick={handleCartToggle}
          >
            <i className="ri-shopping-bag-line"></i>
            <sup className="text-sm px-1.5 text-white rounded-full bg-primary">
              {products.length}
            </sup>
          </button>
          {/*  User Profile Icon */}
          <span>
            {user && user ? (
              <>
                <img
                  src={user?.profileImage || userImg}
                  alt={user.username}
                  className="size-10 rounded-full cursor-pointer"
                  onClick={handleDropdownToggle}
                />

                {isDropdownOpen && (
                  <div className="absolute right-44 mt-3 bg-white shadow-lg rounded-md p-4 w-48 z-50 border border-gray-200 rounded-lg">
                    <ul className="font-medium space-y-4 p-2  ">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index} className="hover:text-primary">
                          <Link
                            to={menu.path}
                            className="dropdown-link"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {menu.lableL}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout}>Logout</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="text-[20px] text-text-dark hover:text-primary"
              >
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
          {/* Hamburger Menu */}
          <button
            className="md:hidden text-2xl text-text-dark"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-white w-full shadow-md transition-all duration-300 ${
          menuOpen ? "max-h-60 py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center gap-4">
          <li className="font-medium text-text-dark hover:text-primary">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="font-medium text-text-dark hover:text-primary">
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
          </li>
          <li className="font-medium text-text-dark hover:text-primary cursor-pointer">
            <div onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}>
              categories{" "}
              <i
                className={`ri-arrow-${
                  mobileDropdownOpen ? "up" : "down"
                }-s-line`}
              ></i>
            </div>
            {mobileDropdownOpen && (
              <ul className="mt-2 w-full bg-gray-100 rounded-md py-2">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/gift" onClick={() => setMenuOpen(false)}>
                    Gift Collection
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/bags" onClick={() => setMenuOpen(false)}>
                    Bags Collection
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/dress" onClick={() => setMenuOpen(false)}>
                    Dress Collection
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/shoose" onClick={() => setMenuOpen(false)}>
                    Shoose Collection'
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="font-medium text-text-dark hover:text-primary">
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      {/* Cart Modal */}
      {isCartOpen && (
        <Cart
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
