import React, { useEffect, useState } from "react";

const CountryCards = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://xcountries-backend.azurewebsites.net/all");

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if the content type is JSON
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid content type. Expected JSON.");
        }

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Country Flags</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.flexContainer}>
          {countries.map((country, index) => (
            <div key={index} style={styles.card}>
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                style={styles.flag}
              />
              <p style={styles.name}>{country.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxHeight: "90vh",
    overflowY: "scroll",
    backgroundColor: "#fff",
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
  },
  card: {
    width: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  flag: {
    width: "100px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  name: {
    marginTop: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default CountryCards;
