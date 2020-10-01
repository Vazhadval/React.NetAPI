using Microsoft.EntityFrameworkCore.Migrations;

namespace React.Migrations
{
    public partial class foreigd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
