"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { MatchingUsers } from "@/types/Matching";

interface MatchingDialogProps {
  projectId: string;
}

const MatchingDialog = (props: MatchingDialogProps) => {
  const { projectId } = props;
  const [matchingUsers, setMatchingUsers] = useState<MatchingUsers>();

  const matching = () => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      const { data, error } = await fetcher<MatchingUsers>({
        url: `project/${projectId}/matching`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        console.log("プロジェクトマッチング成功", data);
        setMatchingUsers(data);
      }
      if (error) {
        console.error("Error matching project:", error);
      }
    };

    fetchData();
  };

  return (
    <Dialog>
      <Button onClick={matching}>
        <DialogTrigger>Matching</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            {matchingUsers?.matching_users.length}人の社員がマッチングしました
          </DialogTitle>
          <DialogDescription>
            {matchingUsers?.matching_users.map((user) => (
              <Badge key={user.user.user_id} className="mr-2 mb-2">
                {user.user.name}
              </Badge>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MatchingDialog;
