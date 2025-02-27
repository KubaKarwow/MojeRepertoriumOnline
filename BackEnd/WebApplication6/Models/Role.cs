using System;
using System.Collections.Generic;

namespace WebApplication6.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Nazwa { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
