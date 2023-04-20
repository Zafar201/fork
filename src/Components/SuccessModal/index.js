import React from "react";
import { Box, Fade, Modal } from "@mui/material";

function SuccessModal({ modalOpen, handleClose, modalValue, className }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        className="Popups"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box>
            <div className={className}>
              <Button onClick={handleClose}>
                <img src={Close} />
              </Button>
              {modalValue}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SuccessModal;
