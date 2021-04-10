<template>
  <!-- Right bar chat  -->
  <div id="rightbar" class="rightbar">
    <div class="slim_scroll">
      <div class="chat_list">
        <form>
          <div class="input-group c_input_group">
            <div class="input-group-prepend">
              <span class="input-group-text"
                ><i class="icon-magnifier"></i
              ></span>
            </div>
            <input type="text" class="form-control" placeholder="Search..." />
          </div>
        </form>
        <div class="body">
          <ul class="nav nav-tabs3 white mt-3 d-flex text-center">
            <li class="nav-item flex-fill">
              <a
                class="nav-link active show"
                data-toggle="tab"
                href="#chat-Users"
                >Chat</a
              >
            </li>
            <li class="nav-item flex-fill">
              <a class="nav-link" data-toggle="tab" href="#chat-Groups"
                >Groups</a
              >
            </li>
            <li class="nav-item flex-fill">
              <a class="nav-link mr-0" data-toggle="tab" href="#chat-Contact"
                >Contact</a
              >
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane vivify fadeIn active show" id="chat-Users">
              <ul class="right_chat list-unstyled mb-0 animation-li-delay">
                <li class="online">
                  <a href="javascript:void(0);" class="media">
                    <img
                      class="media-object"
                      src="assets/images/xs/avatar4.jpg"
                      alt=""
                    />
                    <div class="media-body">
                      <span class="name"
                        >Louis Henry
                        <small class="text-muted font-12">10 min</small></span
                      >
                      <span class="message">How do you do?</span>
                      <span class="badge badge-outline status"></span>
                    </div>
                  </a>
                </li>
                <li class="offline">
                  <a href="javascript:void(0);" class="media">
                    <img
                      class="media-object"
                      src="assets/images/xs/avatar2.jpg"
                      alt=""
                    />
                    <div class="media-body">
                      <span class="name"
                        >Lisa Garett
                        <small class="text-muted font-12">18 min</small></span
                      >
                      <span class="message"
                        >I've forgotten how it felt before</span
                      >
                      <span class="badge badge-outline status"></span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
