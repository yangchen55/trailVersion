import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteCat, fetchCategory, updateCat } from "../../pages/category/categoryAction";


export const CategoryTable = () => {
  const dispatch = useDispatch();

  const { cats } = useSelector((state) => state.cat);
  const [showCats, setShowCats] = useState([]);
  const [selecteCat, setSelectedCat] = useState({});

  useEffect(() => {
    if (!showCats.length) {
      dispatch(fetchCategory());
    }
    setShowCats(cats);
  }, [dispatch, cats, showCats])


  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCat(_id));
    }
  };

  const handleOnEdit = (item) => {
    setSelectedCat(item);
    // dispatch(setShow(true));
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    const tempArg = cats.filter(({ name }) => {
      return name.toLowerCase().includes(value.toLowerCase());
    });
    setShowCats(tempArg);
  };

  const handleOnSwitch = (e) => {
    const { checked, value } = e.target;
    const valArg = value.split("|");

    if (window.confirm("Are you sure you want to change the status?")) {
      const obj = {
        _id: valArg[0],
        name: valArg[1],
        status: checked ? "active" : "inactive",
      };
      console.log(valArg)

      dispatch(updateCat(obj));
    }
  };

  const onCatNameChange = (e) => {
    const { value } = e.target;
    setSelectedCat({
      ...selecteCat,
      name: value,
    });
  };

  const handleOnSave = () => {
    const { _id, name, status } = selecteCat;

    if (window.confirm("Are you sure you want to change the status?")) {
      dispatch(updateCat({ _id, name, status }));
      setSelectedCat({});
    }
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between mb-2">
        <div>{showCats.length} categories found!</div>
        <div className="d-flex align-items-center">
          <label> Search: </label>{" "}
          <Form.Control
            onChange={handleOnChange}
            placeholder="Search by name"
          />
        </div>
      </div>
      {/* <Custom show={false} title="Update category ">
        <EditCatFrm selecteCat={selecteCat} />
      </Custom> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Status</th>
            <th> Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showCats?.length > 0 &&
            showCats.map((itme, i) => (
              <tr key={itme?._id}>
                <td>{i + 1}</td>
                <td>
                  <Form.Check
                    onChange={handleOnSwitch}
                    type="switch"
                    checked={itme.status === "active"}
                    value={itme._id + "|" + itme.name}
                  />
                </td>
                <td>
                  {selecteCat._id === itme._id ? (
                    <Form.Control
                      value={selecteCat.name}
                      onChange={onCatNameChange}
                    />
                  ) : (
                    itme.name
                  )}
                </td>
                <td>{itme.slug}</td>
                {selecteCat._id === itme._id ? (
                  <td>
                    <Button
                      onClick={handleOnSave}
                      variant="success">
                      Save
                    </Button>{" "}
                    {/* <Button
                      onClick={() => handleOnEdit({})}
                      variant="info">
                      Cancel
                    </Button> */}
                  </td>
                ) : (
                  <td>
                    <Button
                      onClick={() => handleOnEdit(itme)}
                      variant="warning"
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      onClick={() =>
                        handleOnDelete(itme._id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
