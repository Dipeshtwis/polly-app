import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import Button from "components/Button";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const Dashboard = ({ history, isLoggedIn }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const destroyPoll = async id => {
    try {
      await pollsApi.destroy(id);
      await fetchPolls();
    } catch (error) {
      logger.error(error);
    }
  };

  const showPoll = id => {
    history.push(`/polls/${id}/show`);
  };

  const updatePoll = id => {
    history.push(`/polls/${id}/edit`);
  };

  const createPoll = () => {
    history.push("/polls/new");
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center mt-8 py-4">
        <h1 className="text-bb-purple text-4xl font-medium">Polls</h1>
        <Button type="button" onClick={createPoll} buttonText="Create +" />
      </div>
      {either(isNil, isEmpty)(polls) ? (
        <h1 className="text-3xl leading-5 text-center pt-6">
          No Polls Available
        </h1>
      ) : (
        <ListPolls
          data={polls}
          destroyPoll={destroyPoll}
          showPoll={showPoll}
          updatePoll={updatePoll}
        />
      )}
    </Container>
  );
};

export default Dashboard;
