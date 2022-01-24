using Microsoft.EntityFrameworkCore.Migrations;

namespace MeetUp.Persistence.Migrations
{
    public partial class LikedPostsNew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPost_AspNetUsers_LikerId",
                table: "LikedPost");

            migrationBuilder.DropForeignKey(
                name: "FK_LikedPost_Posts_PostId",
                table: "LikedPost");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LikedPost",
                table: "LikedPost");

            migrationBuilder.RenameTable(
                name: "LikedPost",
                newName: "LikedPosts");

            migrationBuilder.RenameIndex(
                name: "IX_LikedPost_PostId",
                table: "LikedPosts",
                newName: "IX_LikedPosts_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts",
                columns: new[] { "LikerId", "PostId" });

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosts_AspNetUsers_LikerId",
                table: "LikedPosts",
                column: "LikerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosts_Posts_PostId",
                table: "LikedPosts",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosts_AspNetUsers_LikerId",
                table: "LikedPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosts_Posts_PostId",
                table: "LikedPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LikedPosts",
                table: "LikedPosts");

            migrationBuilder.RenameTable(
                name: "LikedPosts",
                newName: "LikedPost");

            migrationBuilder.RenameIndex(
                name: "IX_LikedPosts_PostId",
                table: "LikedPost",
                newName: "IX_LikedPost_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikedPost",
                table: "LikedPost",
                columns: new[] { "LikerId", "PostId" });

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPost_AspNetUsers_LikerId",
                table: "LikedPost",
                column: "LikerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPost_Posts_PostId",
                table: "LikedPost",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
