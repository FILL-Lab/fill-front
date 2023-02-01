/** @format */

import * as echarts from "echarts/core";
import {
  // 系列类型的定义后缀都为 SeriesOption
  LineChart,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
]);

interface Props {
  propsOption: Record<string, any>;
}

export default (props: Props) => {
  // 1. get DOM
  const chartRef = useRef(null);
  const { propsOption } = props;
  useEffect(() => {
    // 2. 实例化表格对象
    const chart = echarts.init(
      chartRef.current as unknown as HTMLDivElement,
      "dark"
    );
    // 3. 定义数据
    const option = {
      backgroundColor: "transparent",
      color: "#00ED89",
      tooltip: {},
      grid: {
        top: 15,
        left: "6%",
        right: "6%",
        bottom: "10%",
      },
      yAxis: {
        type: "value",
      },
    };
    // 4. 调用表格数据
    chart.setOption({ ...option, ...propsOption });
  }, [propsOption]);

  return <div style={{ width: "100%", height: "260px" }} ref={chartRef} />;
};
