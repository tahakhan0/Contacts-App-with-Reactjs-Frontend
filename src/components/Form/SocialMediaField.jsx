import React from "react";

export const SocialMediaField = ({
  data: socialMedia,
  handleAddField,
  handleRemoveField,
  handleChange,
  setSocialMedia,
  errors,
}) => {
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-12 col-form-label col-sm-2 pt-0">
          Social Media
        </legend>
        <div className={socialMedia.length === 0 ? "" : "col-sm-6"}>
          {(socialMedia || []).map((sm, index) => (
            <div key={index} className="form-group row">
              <div
                className={handleChange ? "col-sm-8 pb-2" : "col-sm-12 pb-2"}
              >
                <input
                  type="text"
                  className="form-control"
                  value={sm.url || ""}
                  name="url"
                  readOnly={handleChange ? false : true}
                  placeholder="instagram.com/john"
                  onChange={(event) =>
                    handleChange(index, event, socialMedia, setSocialMedia)
                  }
                />
                {socialMedia && errors && errors.url && (
                  <small className="text-danger">{errors.url}</small>
                )}
              </div>
              {handleRemoveField && (
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() =>
                      handleRemoveField(index, socialMedia, setSocialMedia)
                    }
                  >
                    X
                  </button>
                </div>
              )}
              {index >= socialMedia.length - 1 && handleAddField && (
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleAddField(socialMedia, setSocialMedia)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {socialMedia.length === 0 && handleAddField && (
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleAddField(socialMedia, setSocialMedia)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </fieldset>
  );
};
