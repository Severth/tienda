using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Application.DTOs;

namespace Tienda.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(int id);
        Task<ProductDto> CreateAsync(CreateProductDto createProductDto);
        Task UpdateAsync(int id, UpdateProductDto updateProductDto);
        Task DeleteAsync(int id);
    }
}
