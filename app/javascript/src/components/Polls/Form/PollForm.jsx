import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  setTitle,
  options,
  setOptions,
  loading,
  handleSubmit,
}) => {
  const handleSetOptions = (event, index) => {
    const data = [...options];
    data[index].content = event.target.value;

    setOptions(data);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Write a question"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="w-3/4">
        <Input
          label="Option 1"
          placeholder="Option 1"
          value={options[0].content}
          onChange={e => handleSetOptions(e, 0)}
        />
        <Input
          label="Option 2"
          placeholder="Option 2"
          value={options[1].content}
          onChange={e => handleSetOptions(e, 1)}
        />
        <Input
          label="Option 3"
          placeholder="Option 3"
          value={options[2].content}
          onChange={e => handleSetOptions(e, 2)}
        />
        <Input
          label="Option 4"
          placeholder="Option 4"
          value={options[3].content}
          onChange={e => handleSetOptions(e, 3)}
        />
      </div>
      <div className="flex justify-center mt-6">
        <Button
          type="submit"
          buttonText={type === "create" ? "Create poll" : "Update poll"}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default PollForm;
