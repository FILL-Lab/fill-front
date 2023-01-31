/** @format */
import { Tabs } from "antd";
import { useState } from "react";
import { itemsChart } from "@/app_contants";
import Charts from "@/components/charts";

export default () => {
  const [tab, setTab] = useState<string>("1");
  const optiosnList: Record<string, any> = {
    "1": {
      backgroundColor: "transparent",
      grid: {
        top: 15,
        left: "6%",
        right: "6%",
        bottom: "10%",
      },

      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {},
        },
      ],
    },
    "2": {
      xAxis: {
        type: "category",
        data: ["1-1", "1-2", "1-3", "1-5", "1-6", "1-7", "1-8", "1-9"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [140, 110, 100, 90, 70, 30, 10, 0],
          type: "line",
        },
      ],
    },
    "3": {
      xAxis: {
        type: "category",
        data: ["1-1", "1-2", "1-3", "1-5", "1-6", "1-7", "1-8", "1-9"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [140, 110, 100, 90, 70, 30, 10, 0],
          type: "line",
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
            children: <Charts propsOption={optiosnList[tab]} />,
          };
        })}
        onChange={onChange}
      />
    </div>
  );
};
