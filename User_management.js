$(document).ready(() => {
  $("#Dashboard-a").click(() => {
    $("#Dashboard-a").addClass("active");
    $("#Configuration-a").removeClass("active");
    $("#User_management-a").removeClass("active");
    $("#Projects-a").removeClass("active");
  });

  $("#Configuration-a").click(() => {
    $("#Configuration-a").addClass("active");
    $("#Dashboard-a").removeClass("active");
    $("#User_management-a").removeClass("active");
    $("#Projects-a").removeClass("active");
  });

  $("#User_management-a").click(() => {
    $("#User_management-a").addClass("active");
    $("#Configuration-a").removeClass("active");
    $("#Dashboard-a").removeClass("active");
    $("#Projects-a").removeClass("active");
  });

  $("#Projects-a").click(() => {
    $("#Projects-a").addClass("active");
    $("#Configuration-a").removeClass("active");
    $("#Dashboard-a").removeClass("active");
    $("#User_management-a").removeClass("active");
  });

  const modal = $("#myModal");
  const btn = $("#myBtn");
  const span = $(".close");
  const cancel = $("#cancelModal");
  btn.click(() => {
    modal.css("display", "block");
    $(".modal-body span:eq(0)").html("");
  });
  span.click(() => modal.css("display", "none"));
  cancel.click(() => modal.css("display", "none"));

  $("#nodetable").hide();
  $("table")
    .on("mouseenter", "tr", function () {
      $("tr:eq(" + this.id + ") td span").removeClass("hide");
      const row = this.id;
      $("tr:eq(" + row + ") td span .fa-trash").click(() => {
        $("#DeleteConfirm").css("display", "block");
        $("#CancelDeleteModal").on("click", () =>
          $("#DeleteConfirm").css("display", "none")
        );
        $("#Yes").on("click", () => {
          $("#DeleteConfirm").css("display", "none");
          $("tr:eq(" + row + ") td").remove();
        });
      });
    })
    .on("mouseleave", "tr", function () {
      $("tr:eq(" + this.id + ") td span").addClass("hide");
    });

  $("table").on("click", "td i.fa-pencil-square-o", function (e) {
    e.preventDefault();
    $this = [];
    $thisvalues = [];
    for (let index = 0; index < 5; index++) {
      $this[index] = $(this)
        .closest("tr")
        .find("td:eq(" + index + ")");
      $thisvalues[index] = $this[index].text();
      $this[index].empty();
      if (index <= 3)
        $('<input type="text" class="editfield"/>')
          .val($thisvalues[index])
          .appendTo($this[index]);
      else
        $(`<select name="nodetype" size="1" class="editfield">
          <option value="node1" selected>Node Type</option>
          <option value="node2">Node 1 Type</option>
          <option value="node3">Node Type</option>
          <option value="node4">Node Type</option>
        </select>`)
          .val($thisvalues[index])
          .appendTo($this[index]);
    }

    $(this).siblings("i").removeClass("hide");
    $(this).hide();

    $("table i.fa-floppy-o").click(function () {
      $(this).addClass("hide");
      $(this).siblings("i").show();

      $(".editfield").addClass("hide");
      for (let index = 0; index < 6; index++) {
        $thisvalues[index] = $this[index].children(".editfield").val();
        $this[index].html($thisvalues[index]);
      }
    });
  });

  $("input[name=User_Name]").change(function () {
    for (let index = 0; index < $inputvalues.length; index++) {
      if ($(this).val() === $inputvalues[index]) {
        $(".modal-body span:eq(0)").html(
          "User Name exists, select different User Name"
        );
        InvalidUser = true;
      } else {
        $(".modal-body span:eq(0)").html("");
        InvalidUser = false 
      }
    }
  });
});

const navbar = () => {
  $("#myTopnav").toggleClass("responsive");
};

const onformsubmit = () => {
  const newrow = readformdata();
  if (newrow) $("#nodetable").show(800);
  if (!InvalidUser) InsertNewRecord(newrow);
  removeotherthings();
  resetform();
};

var rowIndex = 0;
var InvalidUser = false;
var formreset = false;
$inputvalues = [];

const readformdata = () => {
  const formdata = {};
  var inputs = $("form").serializeArray();
  $.each(inputs, function (i, input) {
    formdata[input.name] = input.value;
  });
  // formdata["adminaccess"] = $("#checkbox").attr("checked")
  var input = $("input[name='adminaccess']").is(":checked");
  formdata["adminaccess"] = input;
  $inputvalues[rowIndex] = formdata["User_Name"];
  return formdata;
};

const resetform = () => {
  $("form")[0].reset();
  InvalidUser = false;
  formreset = true;
};

const InsertNewRecord = (data) => {
  $("#nodetable")
    .append(
      $("<tr id=" + ++rowIndex + " >")
        .append($("<td>").append(data.User_Name).append("</td>"))
        .append($("<td>").append(data.email).append("</td>"))
        .append($("<td>").append(data.Department).append("</td>"))
        .append($("<td>").append(data.Role).append("</td>"))
        .append(
          $("<td>")
            .append(
              data.adminaccess == true
                ? `
                <label class="switch">
                    <input type="checkbox" value="adminaccess" checked="true"/>
                    <i class="slider round"></i>
                 </label>`
                : `
                <label class="switch">
                    <input type="checkbox" value="adminaccess" />
                    <i class="slider round"></i>
                 </label>`
            )
            .append("</td>")
        ).append(`<td>
          <span class="edit">
              <i  class="fa fa-pencil-square-o icon" aria-hidden="true"  title="Edit"></i>
              <i  class="fa fa-floppy-o hide icon" aria-hidden="true"  title="Save"></i>
              <i  class="fa fa-trash icon" aria-hidden="true" title="Delete"></i>
          </span>
          </td>`)
    )
    .append("</tr>");
};

const removeotherthings = () => {
  $("#myModal").css("display", "none");
  $(".nocluster").css("display", "none");
  $("#myBtn").removeClass("addcluster").addClass("changeaddcluster");
  $(".nocluster1").css("display", "none");
  $("#myBtn1").removeClass("addcluster1").addClass("changeaddcluster1");
  $("#myBtn1").html(
    '<i class="fa fa-upload" aria-hidden="true"></i> ' + "Upload CSV/Excel"
  );
  $("#or").css("display", "none");
  $(".downloadcsv").css("display", "none");
  $("#snackbar").addClass("show");
  setTimeout(() => {
    $("#snackbar").removeClass("show");
  }, 3000);
};
