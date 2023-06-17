CREATE TABLE post
(
   `post_id`          INT NOT NULL AUTO_INCREMENT,
   `title`            VARCHAR(255) NOT NULL,
   `subtitle`         VARCHAR(255) NOT NULL,
   `preview_image_alt`VARCHAR(255) NOT NULL,
   `preview_image_src`VARCHAR(255) NOT NULL,
   `background_alt`   VARCHAR(255) NOT NULL,
   `background_src`   VARCHAR(255) NOT NULL,
   `author_name`      VARCHAR(255) NOT NULL,
   `author_img_src`   VARCHAR(255) NOT NULL,
   `publish_date`     VARCHAR(255) NOT NULL,
   `featured`         TINYINT(1) DEFAULT 0,
   `feature`          VARCHAR(255) DEFAULT "",
   `feature_color`    VARCHAR(255) DEFAULT "",
   `content`          TEXT NOT NULL,
   PRIMARY KEY (`post_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;