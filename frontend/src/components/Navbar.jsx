import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../pages/shop/Cart";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import userImg from "../assets/userImg.jpg";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

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

  const userDropdownMenus = [
    { lableL: "Dashboard", path: "/dashboard" },
    { lableL: "profile", path: "/dashboard/profile" },
    { lableL: "payment", path: "/dashboard/payments" },
    { lableL: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="top-0 left-0 w-full bg-white shadow-md z-50">
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
            <li className="font-medium text-text-dark hover:text-primary">
              <Link to="/about">About</Link>
            </li>
            {/* Removed categories dropdown here */}
            <li className="font-medium text-text-dark hover:text-primary">
              <Link to="/contactus">Contact</Link>
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
          {/* User Profile Icon */}
          <span>
            {user && user ? (
              <>
                <img
                  src={user?.userImg?.trim() ? user.image : userImg}
                  alt={user.username}
                  className="size-10 rounded-full cursor-pointer"
                  onClick={handleDropdownToggle}
                />

                {isDropdownOpen && (
                  <div className="absolute right-44 mt-3 bg-white shadow-lg rounded-md p-4 w-48 z-50 border border-gray-200 rounded-lg">
                    <ul className="font-medium space-y-4 p-2">
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

          {/* Removed categories dropdown from mobile menu */}

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
