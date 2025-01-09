import { useTabContext } from "@context/TabContext";
import { StorageHelper } from "helpers";
import { INotification } from "interfaces";
import { useEffect, useState } from "react";
import { NotificationService } from "services";

export default function useNotifications() {
  const { activeTab } = useTabContext();
  const [notifs, setNotifs] = useState<INotification[]>([]);
  const customer = StorageHelper.getItem("customer");
  const { findAllByCustomerId } = NotificationService;

  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (!customer) return;
        const notifs = await findAllByCustomerId(customer.id);
        setNotifs(notifs);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [activeTab]);

  return { notifications: notifs };
}
