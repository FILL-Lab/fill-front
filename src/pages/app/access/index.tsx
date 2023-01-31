/** @format */
import { Tabs } from "antd";
import { useMemo, useState } from "react";
import { accessList } from "@/app_contants";
import Content from "./content";
import NoData from "@/components/NoData";
import { useSelector, shallowEqual } from "react-redux";
import { rootState } from "@/type";
import { getAccount } from "@/utils";
export default () => {
  const wallet = useSelector((state: rootState) => state?.wallet, shallowEqual);
  const [tab, setTab] = useState<string>("deposit");
  const account = useMemo(() => {
    return getAccount(wallet);
  }, [wallet?.result]);
  console.log("===2", wallet);
  return (
    <Tabs
      className='tabs-list app-card'
      popupClassName='chart-list-popup'
      activeKey={tab}
      items={accessList.map((value) => {
        return {
          label: value.label,
          key: value.key,
          children: account ? <Content data={value} /> : <NoData />,
        };
      })}
      onChange={(value) => {
        setTab(value);
      }}
    />
  );
};
