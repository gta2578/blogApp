import React, { useState } from "react";
import close from "./close1.png";
import "./style.sass";

function Services() {
  const initToastState = [
    {
      nameButton1: "",
      textParag: "",
      nameButton2: "",
      isModalOpen: false,
      class: "",
    },
  ];

  const toastArr = [
    {
      isModalOpen: false,
      nameButton1: "Procure toast",
      textParag: "One toast created. Toasty",
      nameButton2: "Yum.",
      class: "",
    },
    {
      isModalOpen: false,
      nameButton1: "Move files",
      textParag: "Moved 6 files.",
      nameButton2: "Undo",
      class: "red",
    },
    {
      isModalOpen: false,
      nameButton1: "Delete root",
      textParag:
        "You do not have permissions to perform this action. " +
        "Please contact your system administrator to request the " +
        "appropriate access rights.",
      nameButton2: "Retry",
      class: "green",
    },
    {
      isModalOpen: false,
      nameButton1: "Log out",
      textParag: "Goodbye, old friend.",
      nameButton2: "Adieu",
      class: "brown",
    },
  ];
  const [toastState, setToastState] = useState(initToastState);
  console.log(toastState);
  return (
    <div className="services">
      <ul className="toastList">
        {toastArr.map(function (elem, i) {
          return (
            <li key={i + "toast"}>
              <button
                className={"procure " + elem.class}
                onClick={() => {
                  setToastState([
                    ...toastState,
                    {
                      isModalOpen: true,
                      nameButton1: elem.nameButton1,
                      textParag: elem.textParag,
                      nameButton2: elem.nameButton2,
                      class: elem.class,
                    },
                  ]);
                  setTimeout(() => {
                    setToastState([
                      {
                        isModalOpen: false,
                        nameButton1: elem.nameButton1,
                        textParag: elem.textParag,
                        nameButton2: elem.nameButton2,
                        class: elem.class,
                      },
                    ]);
                  }, 7000);
                }}
              >
                {elem.nameButton1}
              </button>
            </li>
          );
        })}
      </ul>
      {toastState.map(function (elem, index) {
        console.log(elem, index);
        return (
          <div
            key={index + "over"}
            className={elem.isModalOpen ? "over visible" : "over"}
          >
            <div
              className={
                elem.isModalOpen
                  ? "dial vis " + elem.class
                  : "dial " + elem.class
              }
            >
              <p className="procureText">{elem.textParag}</p>
              <div className="closeWrapper">
                <button
                  className={"yum " + elem.class}
                  onClick={() =>
                    setToastState([
                      {
                        isModalOpen: false,
                        nameButton1: elem.nameButton1,
                        textParag: elem.textParag,
                        nameButton2: elem.nameButton2,
                        class: elem.class,
                      },
                    ])
                  }
                >
                  <a
                    href="https://www.google.com/search?q=toast&source=lnms&tbm=isch"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {elem.nameButton2}
                  </a>
                </button>
                <img
                  className="closeImg"
                  src={close}
                  alt="close"
                  onClick={() =>
                    setToastState([
                      {
                        isModalOpen: false,
                        nameButton1: elem.nameButton1,
                        textParag: elem.textParag,
                        nameButton2: elem.nameButton2,
                        class: elem.class,
                      },
                    ])
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Services;

/*<div className={elem.isModalOpen ? "over visible" : "over"}>
  <div
    className={
      elem.isModalOpen ? "dial vis " + elem.class : "dial " + elem.class
    }
  >
    <p className="procureText">{elem.textParag}</p>
    <div className="closeWrapper">
      <button
        className={"yum " + elem.class}
        onClick={() =>
          setToastState([
            {
              isModalOpen: false,
              nameButton1: elem.nameButton1,
              textParag: elem.textParag,
              nameButton2: elem.nameButton2,
              class: elem.class,
              timeOut: elem.timeOut,
            },
          ])
        }
      >
        <a
          href="https://www.google.com/search?q=toast&source=lnms&tbm=isch"
          target="_blank"
          rel="noopener noreferrer"
        >
          {elem.nameButton2}
        </a>
      </button>
      <img
        className="closeImg"
        src={close}
        alt="close"
        onClick={() =>
          setToastState([
            {
              isModalOpen: true,
              nameButton1: elem.nameButton1,
              textParag: elem.textParag,
              nameButton2: elem.nameButton2,
              class: elem.class,
              timeOut: elem.timeOut,
            },
          ])
        }
      />
    </div>
  </div>
</div>;*/
