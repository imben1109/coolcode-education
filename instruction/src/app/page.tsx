"use client";

import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/query/queryClient";
import Body from "@/app/body";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import UTF8 from "crypto-js/enc-utf8";

export default function Home() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Body />
      </QueryClientProvider>
    </RecoilRoot>
  );
}


declare global {
  interface Window {
    generateAccessToken: any; 
    post: any;
    updateScore: any;
  }
}

window.generateAccessToken = (username: string) => {
    const SALT = "coolcodehacker";
    const hashDigest = sha256(username + SALT);
    const token = Base64.stringify(
                              UTF8.parse(
                                JSON.stringify({
                                  username: username,
                                  hash: hashDigest.toString(),
                                })
                              )
                            )
    return token;
}

window.post = async (url: string, body: any, token: string) => {
  const response = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }); 
  return response
};

window.updateScore = async (username: string, token: string) => {
  const response = await fetch(`${window.location.href}/api/api/assignment/score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      username,
      assignmentId: 1,
      score: 100, 
    }),
  });
  return response;
};