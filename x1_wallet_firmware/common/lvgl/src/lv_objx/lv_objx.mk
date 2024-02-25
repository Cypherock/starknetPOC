SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_arc.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_bar.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_cb.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_ddlist.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_kb.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_line.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_mbox.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_preload.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_roller.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_table.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_tabview.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_tileview.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_btn.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_calendar.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_chart.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_canvas.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_gauge.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_label.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_list.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_slider.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_ta.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_spinbox.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_btnm.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_cont.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_img.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_imgbtn.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_led.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_lmeter.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_page.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_sw.c
SRC_FILES += $(OLED_DIR)/lvgl/src/lv_objx/lv_win.c

DEPPATH += --dep-path $(OLED_DIR)/lvgl/src/lv_objx
VPATH += :$(OLED_DIR)/lvgl/src/lv_objx

CFLAGS += -I$(OLED_DIR)/lvgl/src/lv_objx
