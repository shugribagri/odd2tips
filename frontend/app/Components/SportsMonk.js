"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const SportsMonk = () => {
  const [fixtures, setFixtures] = useState([]);
  const BASE_URL = `https://odd2tips.onrender.com/api/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));

        const response = await axios.get(`${BASE_URL}fixtures`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFixtures(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[50vh] overflow-auto bg-gray-100 rounded-lg shadow-lg px-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-600 bg-gray-200 rounded-md p-2 shadow">
        Football Fixtures
      </h2>
      <ul className="space-y-2">
        {fixtures.map((fixture) => (
          <li
            key={fixture.id}
            className="bg-white border border-gray-200 rounded-md p-3 shadow-sm flex justify-between items-center"
          >
            <span className="font-semibold text-blue-600">{fixture.name}</span>
            <span className="text-sm text-gray-600 bg-green-200 rounded-full px-3 py-1">
              {new Date(fixture.starting_at).toLocaleDateString()} -{" "}
              {new Date(fixture.starting_at).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsMonk;
