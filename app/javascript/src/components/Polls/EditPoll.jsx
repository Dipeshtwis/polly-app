import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import { logger } from "common/logger";

const EditPoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();
  const [options, setOptions] = useState([
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
  ]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update({
        id,
        payload: { poll: { title, options_attributes: options } },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      setOptions(response.data.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PollForm
        type="update"
        title={title}
        setTitle={setTitle}
        options={options}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditPoll;
