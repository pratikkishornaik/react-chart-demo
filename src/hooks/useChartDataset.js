import React, { useState, useEffect } from "react";

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

function useChartDataset(masterData, appNameArr, datesArr) {
  const [appDataSet, setAppDataSet] = useState([]);
  const [dataByApp, setDataByApp] = useState({});
  const [dataByDate, setDataByDate] = useState({});

  useEffect(() => {
    const appSet = appNameArr.map((appName) => {
      return {
        label: appName,
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      };
    });
    setAppDataSet(appSet);
  }, [appNameArr]);

  useEffect(() => {
    const appObj = {};
    const dateObj = {};

    masterData.forEach((data) => {
      const appExists = appObj[data.app];
      if (appExists) {
        appObj[data.app] = [...appObj[data.app], data];
      } else appObj[data.app] = [data];

      const dateExists = dateObj[data.date];
      if (dateExists) {
        dateObj[data.date] = [...dateObj[data.date], data];
      } else dateObj[data.date] = [data];
    });

    setDataByDate(dateObj);
  }, [datesArr]);

  useEffect(() => {
    const updatedAppSet = appDataSet.map((appSet, index) => {
      const appName = appSet.label;

      const data = datesArr.map((dateStr) => {
        const dateArr = dataByDate[dateStr];
        return dateArr.reduce((userCount, currValue) => {
          if (currValue.app == appName)
            userCount += parseInt(currValue.daily_users);
          return userCount;
        }, 0);
      });
      return {
        ...appSet,
        data,
        backgroundColor: backgroundColor[index],
        borderColor: borderColor[index],
      };
    });

    setAppDataSet(updatedAppSet);
  }, [dataByDate]);

  return [dataByApp, dataByDate, appDataSet];
}

export default useChartDataset;
