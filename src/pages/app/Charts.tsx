/** @format */
import { Tabs } from "antd";
import { useState } from "react";
import { itemsChart } from "@/app_contants";
import Charts from "@/components/charts";

const seriesObj = {
  type: "line",
  areaStyle: undefined,
};

export default () => {
  const [tab, setTab] = useState<string>("1");
  const optiosnList: Record<string, any> = {
    "1": {
      backgroundColor: "transparent",
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "2022-08",
          "2022-09",
          "2022-10",
          "2022-11",
          "2022-12",
          "2023-01",
          "2023-02",
        ],
      },

      series: [
        {
          data: [10, 30, 20, 60, 40, 65, 70],
          ...seriesObj,
          areaStyle: {},
        },
      ],
    },
    "2": {
      xAxis: {
        type: "category",
        data: [
          "2022-09",
          "2022-10",
          "2022-11",
          "2022-12",
          "2023-01",
          "2023-02",
        ],
      },
      yAxis: {
        type: "value",
        min: 1,
      },
      series: [
        {
          data: [1, 1.02, 1.04, 1.04, 1.05, 1.07, 1.08, 1.09],
          ...seriesObj,
        },
      ],
    },
    "3": {
      xAxis: {
        type: "category",
        data: [
          "2022-09",
          "2022-10",
          "2022-11",
          "2022-12",
          "2023-01",
          "2023-02",
        ],
      },

      series: [
        {
          data: [2, 5, 6, 18, 10, 13, 12, 17],
          ...seriesObj,
        },
      ],
    },
  };
  const onChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className='chart-list'>
      <Tabs
        className='tabs-list'
        popupClassName='chart-list-popup'
        activeKey={tab}
        items={itemsChart.map((value) => {
          return {
            label: value.label,
            key: value.key,
            children: <Charts propsOption={{ ...optiosnList[tab] }} />,
          };
        })}
        onChange={onChange}
      />
    </div>
  );
};
