import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { getFromLocalStorage } from "helpers/storage";

const ListPolls = ({ data, destroyPoll, showPoll, updatePoll }) => {
  const userId = getFromLocalStorage("authUserId");
  return (
    <div className="mb-8 border-solid border-gray-50 border-2 rounded-md">
      {data.map(poll => (
        <div
          key={poll.id}
          className="flex justify-between items-center border-b gap-x-2"
        >
          <div
            onClick={() => showPoll(poll.id)}
            className="flex items-center cursor-pointer py-4 hover:text-purple-700 text-lg ml-4"
          >
            {poll.title}
          </div>
          {userId == poll.user_id ? (
            <div className="flex justify-between items-center gap-x-2 mr-4">
              <Button onClick={() => updatePoll(poll.id)} buttonText="Edit" />
              <Button
                onClick={() => destroyPoll(poll.id)}
                buttonText="Delete"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

ListPolls.propTypes = {
  data: PropTypes.array.isRequired,
  destroyPoll: PropTypes.func,
};

export default ListPolls;
