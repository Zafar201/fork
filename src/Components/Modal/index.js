import React from "react";
import { Modal, Fade, Box, Backdrop, Button } from "@mui/material";

import Close from "../../assets/images/popupClose.svg";

export default function ModalComponent({
  modalOpen,
  handleClose,
  modalValue,
  className,
}) {
  return (
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
              <img src={Close} alt="close" />
            </Button>
            {modalValue}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
