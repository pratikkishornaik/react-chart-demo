import moment from "moment";
import React, { useState, useEffect } from "react";

function useGetFilterData(appData) {
  const [filterData, setFilterData] = useState({
    date: [],
    country: [],
    app: [],
    platform: [],
    adNetwork: [],
  });

  useEffect(() => {
    parseData();
  }, [appData]);

  const parseData = () => {
    const [datesArr, countryArr, appArr, platformArr, adNetworkArr] = [
      [],
      [],
      [],
      [],
      [],
    ];

    appData.map((data) => {
      datesArr.push(data.date);
      countryArr.push(data.country);
      appArr.push(data.app);
      platformArr.push(data.platform);
      adNetworkArr.push(data.ad_network);
    });
    const uniqueDates = [...new Set(datesArr)];
    uniqueDates.sort((a, b) => {
      return moment(a, "DD/MM/YYYY").diff(moment(b, "DD/MM/YYYY"), "days");
    });

    setFilterData({
      date: uniqueDates,
      country: [...new Set(countryArr)],
      app: [...new Set(appArr)],
      platform: [...new Set(platformArr)],
      adNetwork: [...new Set(adNetworkArr)],
    });
  };

  return filterData;
}

export default useGetFilterData;
