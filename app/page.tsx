import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Human / AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Prompty is an open-source AI and Human prompting tool for the universe
        to discover, create and share prompts promptly!
      </p>
      
      <Feed />
    </section>
  );
};

export default Home;
