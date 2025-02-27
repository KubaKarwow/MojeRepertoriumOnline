using System;
using System.Collections.Generic;

namespace WebApplication6.Models;

public partial class User
{
    public int Id { get; set; }

    public string Imie { get; set; } = null!;

    public string Nazwisko { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Hasło { get; set; } = null!;

    public int RoleId { get; set; }

    public bool Potwierdzony { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual Tłumacz? Tłumacz { get; set; }
}
