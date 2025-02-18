"use client";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { userInterface } from "@/types";
import { userContext } from "./profile";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  UserCircle,
  Mail,
  Building,
  MessageCircle,
  Camera,
} from "lucide-react";

export default function AddMember() {
  const [profile, show] = useState(false);
  const [user, dispatch] = useState<userInterface>();
  const [users, dispatchs] = useState([]);
  const [username, dispatchname] = useState("");
  useEffect(() => {
    async function handle() {
      const response = await fetch(`/api/user/getUsers?username=${username}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) dispatchs(data);
      //console.log("users", users);
    }
    handle();
  }, [username]);
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <Title title="Profiles" />
      <form>
        <input
          onChange={(e) => {
            show(false);
            dispatchname(e.target.value);
          }}
          type="text"
          name="username"
          placeholder="search members"
          className="rounded-md px-2"
        />
      </form>
      {profile ? (
        <>{user && <Profile user={user} />}</>
      ) : (
        <div className="w-full h-full flex flex-col gap-2">
          {users.map((user: userInterface & { _id: string }) => (
            <div
              onClick={() => {
                show(true);
                dispatch(user);
              }}
              className="flex flex-row items-center gap-4 px-5 hover:cursor-pointer hover:bg-[#e7e7e7]"
              key={user._id}
            >
              <Avatar1 src={user.image} username={user.username} />
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Avatar1({
  src,
  username,
  w,
  h,
}: {
  src: string;
  username: string;
  w?: number;
  h?: number;
}) {
  const avatar = createAvatar(identicon, {
    seed: username,
  });
  const svg = avatar.toString();
  return (
    <div className=" rounded-md py-1">
      {src != "NULL" && src ? (
        <Image
          src={src}
          width={w || 35}
          height={h || 35}
          alt=""
          className="rounded-lg"
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: svg }} className="w-[2rem]" />
      )}
    </div>
  );
}

export function Title({ title }: { title: string }) {
  return (
    <div className="text-[#76747f] flex flex-row items-center shadow-sm w-full font-bold justify-between p-4  border-b-[1px] border-[#dfdfdf]">
      <div className="text-[#76747f] flex flex-row items-center w-full h-full font-bold justify-between  ">
        <div className=" flex flex-row items-center gap-2">
          <span className="hover:cursor-pointer">{title}</span>
        </div>
      </div>
    </div>
  );
}

export function Profile({ user }: { user: userInterface }) {
  const [isEditing, setIsEditing] = useState(false);
  const {user:user1, dispatch } = useContext(userContext);

  const toggleDarkMode = () => {
    dispatch((prev) => ({ ...prev, darkMode: !prev.darkMode }));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                variant="outline"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground">@{user.username}</p>
              <div className="mt-2 flex md:flex-col  items-center justify-center md:justify-start space-x-2">
                <Badge variant="outline">{user.status}</Badge>
                <Select
                  value={user.status}
                  onValueChange={(value) => {
                    console.log(value);
                    dispatch((prev) => ({ ...prev, status: value }));
                  }}
                >
                  <SelectTrigger className="w-[100px] text-lg">
                    <p>{user1.status}</p>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Away">Away</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <UserCircle className="text-muted-foreground" />
                  <Label>Username:</Label>
                  {isEditing ? (
                    <Input
                      value={user.username}
                      onChange={(e) =>
                        dispatch((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <span>{user.username}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-muted-foreground" />
                  <Label>Email:</Label>
                  {isEditing ? (
                    <Input
                      value={user.email}
                      onChange={(e) =>
                        dispatch((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={user.darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="teams">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="text-muted-foreground" />
                  <span>Teams:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.teams.map((team) => (
                    <Badge key={team} variant="secondary">
                      {team}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Input
                    placeholder="Add new team"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        dispatch((prev) => ({
                          ...prev,
                          teams: [...prev.teams, e.currentTarget.value],
                        }));
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="channels">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="text-muted-foreground" />
                  <span>Channels:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.channels.map((channel) => (
                    <Badge key={channel} variant="outline">
                      {channel}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Input
                    placeholder="Add new channel"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        dispatch((prev) => ({
                          ...prev,
                          channels: [...prev.channels, e.currentTarget.value],
                        }));
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex justify-end">
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
