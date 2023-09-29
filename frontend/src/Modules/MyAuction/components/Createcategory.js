import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/createcategory.module.css";
import { CREATE_CATEGORY } from "../../../Queries/Category/Mutation/CREATE_CATEGORY";
import { UPDATE_CATEGORY } from "../../../Queries/Category/Mutation/UPDATE_CATEGORY";
import { useMutation } from "@apollo/client";
import { loginContext } from "../../Context/UserContext";
import Loader from "../../Loader/Loader";
import { Context } from "../../User/Components/AlertContext";
import Alert from "../../User/Components/Alert";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  category: yup
    .string()
    .required("Category Required")
    .matches(/^[a-zA-Z ]+$/, "Invalid Category"),
  minimumbid: yup
    .number()
    .required("Minimum Bid Required")
    .positive("Minimum Bid Must Be Greater Than 0"),
});

export const Createcategory = () => {
  const navigate = useNavigate();
  const { auctionData, loading, refreshData, refreshToken } =
    useContext(loginContext);
  const { setAlert, setVisible, visible } = useContext(Context);
  const [category, setCategory] = useState("");
  const { value, categoryid } = useParams();
  const [createCategoryMutation] = useMutation(CREATE_CATEGORY);
  const [updateCategoryMutation] = useMutation(UPDATE_CATEGORY);
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (categoryid) {
      setValue("category", auctionData[value].category[categoryid].category);
      setValue(
        "minimumbid",
        auctionData[value].category[categoryid].minimumbid
      );
    }
  }, [auctionData, categoryid, value]);
  const submitHandler = async (data) => {
    await refreshToken();
    if (
      categoryid
        ? auctionData[value].category.find(
            (categorys) => categorys.category.toLowerCase().trim() === data.category.toLowerCase().trim() 
          ) &&
          auctionData[value].category[categoryid].category !== data.category
        : auctionData[value].category.find(
            (categorys) => categorys.category.toLowerCase().trim() === data.category.toLowerCase().trim()
          )
    ) {
      setAlert({
        message: "Category Name Already Exits for this Auction",
        status: "error",
      });
      setVisible(true);
    } else {
      if (!categoryid) {
        await createCategoryMutation({
          variables: {
            createCategoryInput: {
              auctionid: auctionData[value].auctionid,
              category: data.category.toLowerCase().trim(),
              minimumbid: data.minimumbid,
            },
          },
        });
        setAlert({ message: "Category Added Successfully", status: "success" });
        setVisible(true);
      } else {
        console.log(+categoryid);
        await updateCategoryMutation({
          variables: {
            updateCategoryInput: {
              category: data.category.toLowerCase().trim(),
              auctionid: auctionData[value].auctionid,
              categoryid: +auctionData[value].category[+categoryid].categoryid,
              minimumbid: data.minimumbid,
            },
          },
        });
        setAlert({
          message: "Category Updated Successfully",
          status: "success",
        });
        setVisible(true);
      }
      refreshData();
      navigate(`/dashboard/category/${value}`);
    }
  };

  if (loading) {
    return (
      <div
        className={styles.addplayer}
        style={{ justifyContent: "center", alignItems: "center" }}
        data-testid="loading-spinner"
      >
        <Loader />
      </div>
    );
  }
  return (
    <div className={styles.categorycontainer}>
      <h3>
        <Link to="/dashboard/myauction">My Auction</Link>/
        <Link to={`/dashboard/category/${value}`}>Category</Link>/ Add Category
      </h3>
      <div className={styles.categorydiv}>
        <div className={styles.category}>
          <div className={styles.categoryField}>
            <div className={styles.inputField}>
              <label>Category</label>
              <input
                type="text"
                placeholder="Category"
                {...register("category")}
                className={styles.inputbox}
              ></input>

              <label className={styles.validate}>
                {errors?.category?.message}
              </label>
            </div>
            <div className={styles.inputField}>
              <label>MinimumBid</label>
              <input
                type="number"
                placeholder="Minimum Bid"
                {...register("minimumbid")}
                className={styles.inputbox}
              ></input>

              <label className={styles.validate}>
                {errors?.minimumbid?.message}
              </label>
            </div>
          </div>

          <input
            type="submit"
            value={categoryid ? "Update Category" : "Add Category"}
            data-testid="categorybutton"
            className={styles.addCategoryBtn}
            onClick={handleSubmit(submitHandler)}
          />
        </div>
      </div>
    </div>
  );
};
