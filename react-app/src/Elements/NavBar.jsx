import React from "react";
import styles from "../Elements/NavBar.module.css"; // Link to the CSS file for styles
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ selectedSection, selectedSubSection = "", patient }) => {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleSectionMouseEnter = (section) => {
    clearTimeout(hoverTimeout); // Clear any existing timeout
    setHoveredSection(section);
  };

  const handleSectionMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredSection(null);
    }, 130); // Delay of 500ms
    setHoverTimeout(timeout);
  };

  const handleSectionClick = (event, section, route) => {
    event.stopPropagation();
    //setSelectedSection(section);
    navigate(route, { state: { patient: patient } });
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handlePassword = () => {
    navigate("/changePassword");
  };

  const hasSubsections = (sectionName) => {
    // Logic to determine if a section has subsections
    // For example:
    return (
      sectionName === "wallet" ||
      sectionName === "appointments" ||
      sectionName === "packages"
    ); // Assume 'home' has subsections for this example
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLinks}>
          {/* Example for Home section */}
          <div
            className={
              selectedSection === "home"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("home")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) => handleSectionClick(e, "home", "/")}
          >
            Home {hasSubsections("home") && <span>▼</span>}
            {/* Dropdown Menu */}
            {hoveredSection === "home" && (
              <div
                className={styles.homeDropdownMenu}
                onMouseEnter={() => setHoveredSection("home")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Unique className */}
                {/* ... dropdown items ... */}
              </div>
            )}
          </div>

          <div
            className={
              selectedSection === "orders"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("orders")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) => handleSectionClick(e, "orders", "/orders")}
          >
            Orders {hasSubsections("orders")}
          </div>

          <div
            className={
              selectedSection === "wallet"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("wallet")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) => handleSectionClick(e, "wallet", "/wallet")}
          >
            Wallet {hasSubsections("wallet")}
          </div>

          <div
            className={
              selectedSection === "cart"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("cart")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) => handleSectionClick(e, "cart", "/cart")}
          >
            Cart {hasSubsections("cart")}
          </div>
          <div className={
              selectedSection === "chat"
                ? styles.navbarLinkSelected
                : styles.navbarLinkSection
            }
            onMouseEnter={() => handleSectionMouseEnter("chat")}
            onMouseLeave={() => handleSectionMouseLeave()}
            onClick={(e) => handleSectionClick(e, "chat", "/messenger")}
          >
            Chat {hasSubsections("chat")}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
