import LoadingSpinner from "../../component/commonForComplain/LoadingSpinner";
import { IoSettingsOutline } from "react-icons/io5";
import { FaThumbsUp, FaArrowUp } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data: notifications, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications");
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }
      return res.json();
    },
  });

  // Delete notifications mutation
  const { mutate: deleteNotificationsMutation } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/notifications", {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete notifications");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("All notifications deleted");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteNotifications = () => {
    deleteNotificationsMutation();
  };

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold">Notifications</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            <IoSettingsOutline className="w-4" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={deleteNotifications}>Delete all notifications</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center h-full items-center">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* No Notifications */}
      {notifications?.length === 0 && (
        <div className="text-center p-4 font-bold">No notifications 🤔</div>
      )}

      {/* Notifications List */}
      {notifications?.map((notification) => (
        <div className="border-b border-gray-700" key={notification._id}>
          <div className="flex gap-2 p-4 items-center">
            {/* Icons Based on Notification Type */}
            {notification.type === "upvote" && (
              <FaThumbsUp className="w-7 h-7 text-blue-500" />
            )}
            {notification.type === "status" && (
              <FaArrowUp className="w-7 h-7 text-green-500" />
            )}

            {/* Notification Text */}
            <div>
              {notification.type === "upvote" && (
                <div className="flex gap-1">
                  <span className="font-bold text-info">{notification.from?.name || "Someone"}</span>{" "}
                  upvoted your complaint:{" "}
                  <span className="text-info">{notification.complaint?.title || "Unknown complaint"}</span>
                </div>
              )}
              {notification.type === "status" && (
                <div className="flex gap-1">
                  {notification.message || (
                    <>
                      Complaint{" "}
                      <span className="text-secondary">
                        {notification.complaint?.title || "Unknown complaint"}
                      </span>{" "}
                      status updated to{" "}
                      <span className="font-bold">{notification.complaint?.status || "unknown"}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
