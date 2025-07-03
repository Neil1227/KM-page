
    document.addEventListener("DOMContentLoaded", function () {
      const commentList = document.getElementById("commentList");
      let comments = JSON.parse(localStorage.getItem("comments")) || [];

      function renderComments() {
        commentList.innerHTML = "";
        comments.forEach((comment, index) => {
          let commentElement = document.createElement("div");
          commentElement.classList.add("comment");

          commentElement.innerHTML = `
            <strong>${comment.name}</strong>
            <p>${comment.text}</p>
            <button class="reply-btn btn btn-sm btn-outline-primary mb-2" data-index="${index}">Reply</button>
            <div class="replies" id="replies-${index}">
              ${comment.replies ? comment.replies.map(reply => `
                <div class="reply">
                  <strong>${reply.name}</strong>: ${reply.text}
                </div>
              `).join('') : ''}
            </div>
          `;

          commentList.prepend(commentElement);
        });

        addReplyListeners();
      }

      function addReplyListeners() {
        const replyButtons = document.querySelectorAll(".reply-btn");
        replyButtons.forEach(button => {
          button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const repliesDiv = document.getElementById(`replies-${index}`);

            if (repliesDiv.querySelector(".reply-form")) return;

            const form = document.createElement("form");
            form.classList.add("reply-form", "mt-2");

            form.innerHTML = `
              <input type="text" class="form-control mb-2" placeholder="Your Name" required>
              <textarea class="form-control mb-2" placeholder="Your Reply" rows="2" required></textarea>
              <button type="submit" class="btn btn-sm btn-primary">Submit Reply</button>
            `;

            form.addEventListener("submit", function (event) {
              event.preventDefault();
              const name = form.querySelector("input").value.trim();
              const text = form.querySelector("textarea").value.trim();

              if (name && text) {
                if (!comments[index].replies) comments[index].replies = [];
                comments[index].replies.push({ name, text });

                localStorage.setItem("comments", JSON.stringify(comments));
                renderComments();
              }
            });

            repliesDiv.appendChild(form);
          });
        });
      }

      document.getElementById("commentForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("name").value.trim();
        let text = document.getElementById("comment").value.trim();

        if (name && text) {
          comments.push({ name, text, replies: [] });
          localStorage.setItem("comments", JSON.stringify(comments));
          renderComments();
          document.getElementById("commentForm").reset();

          // Send email notification via EmailJS
          emailjs.send('service_43yjq7r', 'service_fyu6f01', {
            name: name,
            comment: text
          }).then(function(response) {
            console.log('Email sent!', response.status, response.text);
          }, function(error) {
            console.error('Failed to send email:', error);
          });
        }
      });

      renderComments();
    });

    const images = Array.from(document.querySelectorAll(".card img"));
    let currentIndex = 0;
    let modalInstance = null;

    function openModal(imgElement) {
      currentIndex = images.indexOf(imgElement);
      showImage();
      modalInstance = new bootstrap.Modal(document.getElementById("imageModal"));
      modalInstance.show();
    }

    function showImage() {
      const modalImage = document.getElementById("modalImage");
      modalImage.src = images[currentIndex].src;
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    });

    document.addEventListener("keydown", function (event) {
      const modal = document.getElementById("imageModal");
      if (!modal.classList.contains("show")) return;

      if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
      } else if (event.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
      } else if (event.key === "Escape") {
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById("imageModal"));
        if (modalInstance) modalInstance.hide();
      }
    });
