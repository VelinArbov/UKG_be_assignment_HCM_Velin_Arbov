using FluentAssertions;
using Xunit;
using Moq;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using HCM.Application.Positions.Queries;
using HCM.Application.Core;
using HCM.Api.Endpoint;
using HCM.Domain;
using Microsoft.AspNetCore.Http;

namespace HCM.Test.Endpoints
{
    public class PositionEndpointsTests
    {
        #region GetPositionById

        [Fact]
        public async Task GetPositionById_ReturnsOk_WhenPositionExists()
        {
            // Arrange
            var id = Guid.NewGuid();
            var position = new Position
            {
                Id = id,
                Title = "Test Position",
                Description = "Some description",
                Category = "IT",
                City = "Test City",
                Date = DateTime.UtcNow,
                IsCancelled = false
            };

            var mediatorMock = new Mock<IMediator>();
            mediatorMock
                .Setup(m => m.Send(It.Is<GetPositionDetails.Query>(q => q.Id == id), default))
                .ReturnsAsync(Result<Position>.Success(position));

            // Act
            var result = await InvokePrivateEndpoint<IResult>(
                typeof(PositionEndpoints),
                "GetPositionById",
                new object[] { id, mediatorMock.Object }
            );

            // Assert
            result.Should().BeOfType<Ok<Position>>();
            var okResult = result as Ok<Position>;
            okResult!.Value.Should().BeEquivalentTo(position);
        }

        [Fact]
        public async Task GetPositionById_ReturnsNotFound_WhenPositionDoesNotExist()
        {
            // Arrange
            var id = Guid.NewGuid();

            var mediatorMock = new Mock<IMediator>();
            mediatorMock
                .Setup(m => m.Send(It.IsAny<GetPositionDetails.Query>(), default))
                .ReturnsAsync(Result<Position>.Failure("Position not found", 404));

            // Act
            var result = await InvokePrivateEndpoint<IResult>(
                typeof(PositionEndpoints),
                "GetPositionById",
                new object[] { id, mediatorMock.Object }
            );

            // Assert
            result.Should().BeOfType<NotFound<string>>();
            var notFound = result as NotFound<string>;
            notFound!.Value.Should().Be("Position not found");
            notFound.StatusCode.Should().Be(404);
        }

        #endregion

        #region GetAllPositions

        [Fact]
        public async Task GetAllPositions_ReturnsOk_WithListOfPositions()
        {
            // Arrange
            var positions = new List<Position>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Title = "Software Engineer",
                    Description = "Develop stuff",
                    Category = "Engineering",
                    City = "Remote",
                    Date = DateTime.UtcNow,
                    IsCancelled = false
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Title = "Project Manager",
                    Description = "Manage stuff",
                    Category = "Management",
                    City = "Onsite",
                    Date = DateTime.UtcNow,
                    IsCancelled = false
                }
            };

            var result = Result<List<Position>>.Success(positions);

            var mediatorMock = new Mock<IMediator>();
            mediatorMock
                .Setup(m => m.Send(It.IsAny<GetPositionList.Query>(), default))
                .ReturnsAsync(result);

            // Act
            var actualResult = await InvokePrivateEndpoint<IResult>(
                typeof(PositionEndpoints),
                "GetAllPositions",
                new object[] { mediatorMock.Object }
            );

            // Assert
            actualResult.Should().BeOfType<Ok<Result<List<Position>>>>();
            var okResult = actualResult as Ok<Result<List<Position>>>;
            okResult!.Value.Should().BeEquivalentTo(result);
            okResult.Value.Value.Should().HaveCount(2);
        }

        #endregion

        #region Helpers

        private static async Task<T> InvokePrivateEndpoint<T>(Type containingType, string methodName, object[] args)
        {
            var method = containingType.GetMethod(methodName,
                System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);

            method.Should().NotBeNull($"Method {methodName} must exist in {containingType.Name}");

            var result = method!.Invoke(null, args);
            result.Should().NotBeNull();

            return await (Task<T>)result!;
        }

        #endregion
    }
}
